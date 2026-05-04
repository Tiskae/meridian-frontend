import { groq } from "next-sanity";

export const featuredVehiclesQuery = groq`
  *[_type == "vehicle" && featured == true && availability != "Sold"]
  | order(price desc)[0...6]{
    _id,
    _createdAt,
    slug,
    "make": make->{_id, name, slug},
    model,
    trim,
    year,
    bodyType,
    condition,
    mileage,
    mileageUnit,
    price,
    currency,
    featured,
    availability,
    shortIntro,
    "image": images[0].asset,
    "images": images[0...6]{ _key, asset },
    "imageCount": count(images)
  }
`;

export const allVehiclesQuery = groq`
  *[_type == "vehicle" && availability != "Sold"]
  | order(price desc){
    _id,
    _createdAt,
    slug,
    "make": make->{_id, name, slug},
    model,
    trim,
    year,
    bodyType,
    condition,
    mileage,
    mileageUnit,
    price,
    currency,
    featured,
    availability,
    shortIntro,
    "image": images[0].asset,
    "images": images[0...6]{ _key, asset },
    "imageCount": count(images)
  }
`;

export const vehicleBySlugQuery = groq`
  *[_type == "vehicle" && slug.current == $slug][0]{
    ...,
    "make": make->{_id, name, slug},
    "features": features[]->{_id, name, category},
    "location": location->{_id, name, address, city}
  }
`;

export const vehicleSlugsQuery = groq`
  *[_type == "vehicle" && defined(slug.current)].slug.current
`;

export const makesQuery = groq`
  *[_type == "make"] | order(name asc){
    _id,
    name,
    slug
  }
`;

export const makesWithLogosQuery = groq`
  *[_type == "make" && defined(logo)] | order(name asc){
    _id,
    name,
    "logo": logo.asset
  }
`;

export const relatedVehiclesQuery = groq`
  *[_type == "vehicle" && availability != "Sold" && slug.current != $slug]
  | order(featured desc, _createdAt desc)[0...3]{
    _id,
    _createdAt,
    slug,
    "make": make->{_id, name, slug},
    model,
    trim,
    year,
    bodyType,
    condition,
    mileage,
    mileageUnit,
    price,
    currency,
    featured,
    availability,
    shortIntro,
    "image": images[0].asset,
    "images": images[0...6]{ _key, asset },
    "imageCount": count(images)
  }
`;

export const defaultLocationQuery = groq`
  *[_type == "location" && isDefault == true][0]{
    _id,
    name,
    address,
    city
  }
`;
