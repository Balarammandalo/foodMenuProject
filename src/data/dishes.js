const dishes = {
  starter: [
    {
      id: 1,
      name: 'Paneer Tikka',
      description: 'Cubes of paneer marinated in spiced yogurt and grilled to perfection.',
      image: 'https://source.unsplash.com/300x200/?paneer-tikka',
      ingredients: [
        { name: 'Paneer', quantity: '200g' },
        { name: 'Yogurt', quantity: '100g' },
        { name: 'Spices', quantity: '2 tsp' },
        { name: 'Bell Peppers', quantity: '1/2 cup' },
        { name: 'Onions', quantity: '1/2 cup' }
      ],
      isVeg: true
    },
    {
      id: 2,
      name: 'Chicken 65',
      description: 'Spicy, deep-fried chicken appetizer with a crispy coating.',
      image: 'https://source.unsplash.com/300x200/?chicken-65',
      ingredients: [
        { name: 'Chicken', quantity: '250g' },
        { name: 'Cornflour', quantity: '2 tbsp' },
        { name: 'Chili Powder', quantity: '1 tsp' },
        { name: 'Ginger Garlic Paste', quantity: '1 tsp' },
        { name: 'Curry Leaves', quantity: '5-6 leaves' }
      ],
      isVeg: false
    }
  ],
  mainCourse: [
    ...Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      name: `Kadhai Paneer ${i + 1}`,
      description: 'Paneer cubes in spicy onion gravy with onions and capsicum cubes.',
      image: `https://source.unsplash.com/featured/500x400/?kadhai-paneer-${i + 1},indian-food,curry`,
      ingredients: [
        { name: 'Paneer', quantity: '200g' },
        { name: 'Onions', quantity: '2 medium' },
        { name: 'Capsicum', quantity: '1 medium' },
        { name: 'Tomatoes', quantity: '3 medium' },
        { name: 'Spices', quantity: '2 tbsp' },
        { name: 'Cream', quantity: '2 tbsp' }
      ],
      isVeg: true,
      category: {
        id: 1,
        name: 'North Indian',
        image: 'https://storage.googleapis.com/chefkartimages/customer_app_assets/star_chef/north_indian.png',
        isRecommendedForMealSuggestion: true
      },
      dishType: 'CURRY',
      forChefit: true,
      forParty: true,
      nameHi: '',
      nameBn: '',
      mealType: 'MAIN COURSE',
      type: 'VEG',
      categoryId: 1
    }))
  ],
  dessert: [
    {
      id: 7,
      name: 'Gulab Jamun',
      description: 'Soft, spongy milk balls soaked in sugar syrup, a classic Indian sweet.',
      image: 'https://source.unsplash.com/300x200/?gulab-jamun',
      ingredients: [
        { name: 'Milk Powder', quantity: '1 cup' },
        { name: 'All-purpose Flour', quantity: '1/4 cup' },
        { name: 'Ghee', quantity: '1 tbsp' },
        { name: 'Sugar', quantity: '1.5 cups' },
        { name: 'Water', quantity: '1.5 cups' }
      ],
      isVeg: true
    },
    {
      id: 8,
      name: 'Rasmalai',
      description: 'Soft cheese patties soaked in sweetened, thickened milk and flavored with cardamom.',
      image: 'https://source.unsplash.com/300x200/?rasmalai',
      ingredients: [
        { name: 'Paneer', quantity: '250g' },
        { name: 'Milk', quantity: '1 liter' },
        { name: 'Sugar', quantity: '1 cup' },
        { name: 'Saffron', quantity: 'Few strands' },
        { name: 'Cardamom Powder', quantity: '1/2 tsp' }
      ],
      isVeg: true
    }
  ],
  classic: [
    {
      id: 9,
      name: 'Biryani',
      description: 'Fragrant rice dish cooked with aromatic spices and your choice of meat or vegetables.',
      image: 'https://source.unsplash.com/300x200/?biryani',
      ingredients: [
        { name: 'Basmati Rice', quantity: '2 cups' },
        { name: 'Chicken/Vegetables', quantity: '500g' },
        { name: 'Yogurt', quantity: '1/2 cup' },
        { name: 'Biryani Masala', quantity: '2 tbsp' },
        { name: 'Saffron Milk', quantity: '2 tbsp' }
      ],
      isVeg: false
    },
    {
      id: 10,
      name: 'Butter Naan',
      description: 'Soft and buttery leavened flatbread, perfect with any curry.',
      image: 'https://source.unsplash.com/300x200/?naan',
      ingredients: [
        { name: 'All-purpose Flour', quantity: '2 cups' },
        { name: 'Yogurt', quantity: '2 tbsp' },
        { name: 'Butter', quantity: '2 tbsp' },
        { name: 'Yeast', quantity: '1 tsp' },
        { name: 'Sugar', quantity: '1 tsp' }
      ],
      isVeg: true
    }
  ]
};

export default dishes;
