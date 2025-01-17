import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('Api here');

export async function generateGiftSuggestions(recipient: {
  name: string;
  age: number;
  hobbies: string;
  occasion: string;
  priceRange: string;
  currency: string;
  deliveryTime: string;
}) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `You are a gift recommendation expert. Generate exactly 3 thoughtful gift suggestions in JSON format for this person:

Name: ${recipient.name}
Age: ${recipient.age}
Hobbies/Interests: ${recipient.hobbies}
Occasion: ${recipient.occasion}
Price Range: ${recipient.priceRange} ${recipient.currency}
Delivery Time Preference: ${recipient.deliveryTime}

Respond ONLY with a JSON array of 3 objects. Each object must have these exact properties:
{
  "name": "Gift name",
  "brand": "Brand name",
  "description": "Brief description",
  "price": "Price in ${recipient.currency}",
  "link": "Generic store link (e.g., Amazon)"
}

Example format:
[
  {
    "name": "Wireless Earbuds",
    "brand": "Sony",
    "description": "High-quality wireless earbuds perfect for music lovers",
    "price": "79.99 ${recipient.currency}",
    "link": "https://www.amazon.com"
  }
]`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      const parsed = JSON.parse(text);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        throw new Error('Invalid response format');
      }
      
      // Validate each gift object has required properties
      const validGifts = parsed.map(gift => ({
        name: gift.name || 'Gift Suggestion',
        brand: gift.brand || 'Various Brands',
        description: gift.description || 'No description available',
        price: gift.price || `Price not available in ${recipient.currency}`,
        link: gift.link || 'https://www.amazon.com'
      })).slice(0, 3); // Ensure exactly 3 gifts
      
      return validGifts;
    } catch (parseError) {
      console.error('Failed to parse API response:', text);
      throw new Error('Failed to process gift suggestions');
    }
  } catch (error) {
    console.error('Error generating gift suggestions:', error);
    throw new Error('Failed to generate gift suggestions. Please try again.');
  }
}