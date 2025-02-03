export async function GET() {
    const products = [
      { id: 1, name: 'Product 1', price: 100 },
      { id: 2, name: 'Product 2', price: 200 },
    ];
  
    return new Response(JSON.stringify(products), {
      headers: { 'Content-Type': 'application/json' },
    });
  }