export interface locale {
  key:string;
  value:string;
}

export interface ItemStats {
  armor:number;
  health:number;
  imagination:number;
}

export interface Skill {
  id:number;
  behaviorId:number;
  onEquip:boolean;
  imaginationCost:number;
  cooldownGroup:number;
  cooldownTime:number;
  armorBonus:number;
  healthBonus:number;
  imaginationBonus:number;
}

export interface ObjectElement {
  id:number;
  name:string;
}

export interface ItemPrecondition {
  id:number;
  description:string;
}

export type EquipLocation = 'Head' | 'Chest' | 'Legs' | 'Right Hand' | 'Left Hand' | 'Armor' | 'Consumable' | 'Unknown'

export interface ItemComponent {
  proxyItems:ObjectElement[];
  equipLocations:EquipLocation[];
  buyPrice:number;
  rarity:number;
  stackSize:number;
  color:number;
  preconditions:ItemPrecondition[];
  twoHanded:boolean;
  alternateCurrencyId:number;
  alternateCurrencyCost: number;
  alternateCurrencyName: string;
  commendationCurrencyId:number;
  commendationCurrencyCost:number;
  commendationCurrencyName:string;
  isWeapon:boolean;
  levelRequirement:number;
}

export interface ItemDrop {
  LootTableIndex:number;
  LootMatrixIndex:number;
  RarityTableIndex:number;
  rarityChance:number;
  itemsInLootTable:number;
  percent:number;
  minToDrop:number;
  maxToDrop:number;
  destructibleComponents:number[];
  enemies:ObjectElement[];
  packageComponents:number[];
  packages:ObjectElement[];
  totalChance:number;
}

export interface MissionReward {
  id:number;
  name:string;
  count:number;
}

export interface NPCMission {
  id:number;
  name:string;
  description:string;
  repeatable:boolean;
  rewards:MissionReward[];
}

export interface SoldItem {
  id:number;
  name:string;
  cost:number;
}