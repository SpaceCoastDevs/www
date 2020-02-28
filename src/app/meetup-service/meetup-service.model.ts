export interface Photo {
  photo_link?: string;
}
export interface Group {
  joinMode?: string;
  created?: number;
  name?: string;
  groupLon?: number;
  id?: number;
  urlname?: string;
  groupLat?: number;
  who?: string;
  group_photo?: Photo;
}

export interface Venue {
  country?: string;
  localizedCountryName?: string;
  city?: string;
  address1?: string;
  name?: string;
  lon?: number;
  id?: number;
  state?: string;
  lat?: number;
  repinned?: boolean;
}

export interface Event {
  utcOffset?: number;
  venue?: Venue;
  rsvpLimit?: number;
  headcount?: number;
  visibility?: string;
  waitlistCount?: number;
  created?: number;
  maybeRsvpCount?: number;
  description?: string;
  eventURL?: string;
  yesRsvpCount?: number;
  duration?: number;
  name?: string;
  id?: string;
  photoURL?: string;
  time?: number;
  updated?: number;
  group?: Group;
  status?: string;
  featured_photo?: Photo;
}
