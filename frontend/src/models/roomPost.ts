interface RoomPost {
    _id:string;
    Posttype: 'Roomie' | 'Room';
    postId: string;
    userId: string;
  
    lookingForRoom: {
      name: string;
      locationAddress?: string;
      proximity?: string;
      description: string;
    };
  
    pricingAndLeaseDetails: {
      monthlyRent: string;
      utilitiesIncluded?: boolean;
      leaseDuration: string;
      securityDeposit?: string;
    };
  
    roomAndPropertyDetails: {
      houseType: string[];
      numBeds?: string;
      numBaths?: string;
      furnished: string[];
      utilities: string[];
      amenities: string[];
    };
  
    preferences: {
      preferences: string[];
      moreDescription?: string;
    };
  
    contactInfo: {
      contactAvailability: string;
      email: string;
      phone: string;
    };
  
    photos: string[],
    createdDate: Date
  }

  export default RoomPost;
