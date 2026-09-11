// to add a headshot for someone once you have the photo file:
//   1. drop the image into src/assets/team/ (e.g. agender-mongwe.jpg)
//   2. import it at the top of this file:
//        import agenderPhoto from "../assets/team/agender-mongwe.jpg";
//   3. set that person's `photo` field below to the imported variable.
// anyone left with `photo: undefined` just shows their name and role. no
// placeholder image is rendered for them.

export type TeamMember = {
  name: string;
  role: string;
  photo?: string;
};

const team: TeamMember[] = [
  {
    name: "Agender Mongwe",
    role: "Founder & CEO",
    photo: undefined,
  },
  {
    name: "Masuku Smith",
    role: "Co-founder & COO",
    photo: undefined,
  },
  {
    name: "Mbali Smith",
    role: "Chief Marketing Officer",
    photo: undefined,
  },
  {
    name: "Yinhla Ndlovu",
    role: "Chief Technology Officer",
    photo: undefined,
  },
  {
    name: "Nhletelo Bethel",
    role: "Senior Backend Engineer",
    photo: undefined,
  },
];

export default team;
