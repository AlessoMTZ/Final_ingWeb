export interface Pokemon {
  name: string;
  url: string;
  id?: number;
  sprites?: {
    front_default: string;
  }
  abilites?: Array<{
    ability: {
      name: string;
      url: string;
    };
  }>;
  
}