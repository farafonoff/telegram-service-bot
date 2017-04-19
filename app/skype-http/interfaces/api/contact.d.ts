import { Nullable } from "../utils";
import { FullId } from "./api";
export interface Location {
    country: string;
    city?: string;
}
export interface Phone {
    number: string;
    type: number;
}
export interface Contact {
    id: FullId;
    avatarUrl: string | null;
    phones: Phone[];
    name: {
        first: string;
        surname: string;
        nickname: string;
    };
    activityMessage: string | null;
    locations: Location[];
}
export interface Profile {
    fistname: string;
    lastname: string;
    birthday: Nullable<any>;
    language: "en" | string;
    country: "us" | string;
    province: Nullable<any>;
    city: Nullable<any>;
    homepage: Nullable<any>;
    about: Nullable<any>;
    emails: any[];
    phoneMobile: Nullable<any>;
    phoneHome: Nullable<any>;
    phoneOffice: Nullable<any>;
    mood: Nullable<any>;
    richMood: Nullable<any>;
    avatarUrl: Nullable<any>;
    username: string;
}
