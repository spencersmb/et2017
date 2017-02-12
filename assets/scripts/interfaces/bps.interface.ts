export interface BpsInterface {
    mobile: number;
    tablet: number;
    laptop: number;
    desktop: number;
    desktop_xl: number;
    [key: string]: number; //define the key for this object if you have mixed object values change to any
}

export interface CustomEvent {
    detail: string; //custom 
}