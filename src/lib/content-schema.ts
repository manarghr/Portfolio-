/**
 * Describes each editable section to the dashboard. The editor UI is generic and
 * reads these, so adding another section is a matter of adding an entry here plus
 * a fallback in content.ts — no new page or form component.
 *
 * Plain data only: this object crosses the server/client boundary as a prop,
 * so it must stay serialisable (no functions).
 */

import type { SectionKey } from '@/lib/content'

export type Field = {
  name: string
  label: string
  type: 'text' | 'textarea' | 'url' | 'select'
  placeholder?: string
  help?: string
  wide?: boolean
  options?: { value: string; label: string }[]
}

export type SectionSchema = {
  key: SectionKey
  title: string
  blurb: string
  /** 'list' = repeatable items with add/reorder/remove, 'single' = one fixed record */
  kind: 'list' | 'single'
  itemName: string
  titleField: string
  fields: Field[]
  blank: Record<string, string>
}

const yesNo = [
  { value: 'no', label: 'No' },
  { value: 'yes', label: 'Yes' },
]

const months = Array.from({ length: 12 }, (_, i) => ({
  value: String(i + 1),
  label: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
}))

export const sections: Record<SectionKey, SectionSchema> = {
  hero: {
    key: 'hero',
    title: 'Hero',
    blurb: 'The first thing people see at the top of the page.',
    kind: 'single',
    itemName: 'hero',
    titleField: 'headline',
    fields: [
      { name: 'greeting', label: 'Typed greeting', type: 'text', placeholder: "Hey, I'm Manar!" },
      { name: 'headline', label: 'Headline, first line', type: 'text', placeholder: 'AI Enthusiast' },
      {
        name: 'headlineAccent',
        label: 'Headline, coloured part',
        type: 'text',
        placeholder: 'Web Developer',
        help: 'Shown after “&” in the steel blue.',
      },
      { name: 'lead', label: 'Intro paragraph', type: 'textarea', wide: true },
      { name: 'badge', label: 'Availability badge', type: 'text', placeholder: 'Open to Remote Work' },
      {
        name: 'photo',
        label: 'Photo',
        type: 'text',
        placeholder: '/profile.jpg',
        help: 'Put the file in public/ and write its path here.',
      },
    ],
    blank: { greeting: '', headline: '', headlineAccent: '', lead: '', badge: '', photo: '/profile.jpg' },
  },

  about: {
    key: 'about',
    title: 'About',
    blurb: 'The written block under “The person behind the code”.',
    kind: 'single',
    itemName: 'about',
    titleField: 'location',
    fields: [
      { name: 'location', label: 'Post-it, line 1', type: 'text', placeholder: '📍 Algeria 🇩🇿' },
      { name: 'languages', label: 'Post-it, line 2', type: 'text', placeholder: '🗣️ EN · FR · AR' },
      {
        name: 'body',
        label: 'Paragraphs',
        type: 'textarea',
        wide: true,
        help: 'Leave a blank line between paragraphs.',
      },
    ],
    blank: { location: '', languages: '', body: '' },
  },

  skills: {
    key: 'skills',
    title: 'Skills',
    blurb: 'The grouped tag cards under “Tools and technologies I use most often”.',
    kind: 'list',
    itemName: 'group',
    titleField: 'label',
    fields: [
      { name: 'label', label: 'Group name', type: 'text', placeholder: 'Frontend' },
      {
        name: 'skills',
        label: 'Skills',
        type: 'textarea',
        wide: true,
        placeholder: 'React, Next.js, TypeScript',
        help: 'Separate each one with a comma.',
      },
    ],
    blank: { label: '', skills: '' },
  },

  projects: {
    key: 'projects',
    title: 'Projects',
    blurb: 'The cards under “Things I’ve built & contributed to”.',
    kind: 'list',
    itemName: 'project',
    titleField: 'name',
    fields: [
      { name: 'name', label: 'Name', type: 'text', placeholder: 'Elevate 2.0 Website' },
      { name: 'desc', label: 'Description', type: 'textarea', wide: true },
      {
        name: 'color',
        label: 'Post-it colour',
        type: 'select',
        options: [
          { value: 'y', label: 'Yellow' },
          { value: 'b', label: 'Blue' },
          { value: 'p', label: 'Pink' },
        ],
      },
      {
        name: 'image',
        label: 'Image',
        type: 'text',
        placeholder: 'Leave empty to auto-screenshot the live link',
        help: 'Leave empty and a screenshot of the live link is used. To use your own, put the file in public/ and write its path here.',
      },
      {
        name: 'live',
        label: 'Live link',
        type: 'url',
        placeholder: 'https://…',
        help: 'Optional. Leave empty and the Live button is hidden.',
      },
      {
        name: 'code',
        label: 'Code link',
        type: 'url',
        placeholder: 'https://github.com/…',
        help: 'Optional. Leave empty for private repos and the GitHub button is hidden.',
      },
    ],
    blank: { name: '', desc: '', color: 'y', image: '', live: '', code: '' },
  },

  services: {
    key: 'services',
    title: 'What I do',
    blurb: 'The three service cards under “Need it built? Here’s how I help”.',
    kind: 'list',
    itemName: 'service',
    titleField: 'title',
    fields: [
      {
        name: 'icon',
        label: 'Icon',
        type: 'select',
        options: [
          { value: 'browser', label: 'Browser window (sketch)' },
          { value: 'dashboard', label: 'Dashboard panel (sketch)' },
          { value: 'toolbox', label: 'Idea bulb & gear (sketch)' },
        ],
      },
      { name: 'title', label: 'Title', type: 'text', placeholder: 'Event & landing pages' },
      { name: 'blurb', label: 'Description', type: 'textarea', wide: true },
    ],
    blank: { icon: 'browser', title: '', blurb: '' },
  },

  journey: {
    key: 'journey',
    title: 'Journey',
    blurb: 'The bars on the Education & Experience timeline.',
    kind: 'list',
    itemName: 'entry',
    titleField: 'title',
    fields: [
      { name: 'title', label: 'Title', type: 'text', placeholder: 'AI Intern' },
      { name: 'place', label: 'Place', type: 'text', placeholder: 'Djezzy' },
      {
        name: 'kind',
        label: 'Lane',
        type: 'select',
        options: [
          { value: 'edu', label: 'Education' },
          { value: 'work', label: 'Work' },
          { value: 'club', label: 'Club' },
        ],
      },
      { name: 'fromYear', label: 'Start year', type: 'text', placeholder: '2025' },
      { name: 'fromMonth', label: 'Start month', type: 'select', options: months },
      { name: 'toYear', label: 'End year', type: 'text', placeholder: '2026' },
      { name: 'toMonth', label: 'End month', type: 'select', options: months },
      {
        name: 'ongoing',
        label: 'Still going?',
        type: 'select',
        options: yesNo,
        help: 'Fades the bar out to the right instead of ending it.',
      },
      {
        name: 'row',
        label: 'Stack row',
        type: 'text',
        placeholder: '0',
        help: '0 is the normal row. Use 1 when two entries in the same lane overlap.',
      },
      { name: 'cap', label: 'End emoji', type: 'text', placeholder: '🎓', help: 'Optional.' },
      { name: 'note', label: 'Description', type: 'textarea', wide: true },
      { name: 'id', label: 'Internal id', type: 'text', placeholder: 'djezzy', help: 'Any short unique word.' },
    ],
    blank: {
      id: '', kind: 'work', title: '', place: '',
      fromYear: '2026', fromMonth: '1', toYear: '2026', toMonth: '12',
      ongoing: 'no', cap: '', row: '0', note: '',
    },
  },

  certification: {
    key: 'certification',
    title: 'Certifications',
    blurb: 'The certificate card and the image beside it.',
    kind: 'single',
    itemName: 'certificate',
    titleField: 'title',
    fields: [
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'issuer', label: 'Issued by', type: 'text' },
      { name: 'year', label: 'Year', type: 'text', placeholder: '2026' },
      {
        name: 'image',
        label: 'Certificate image',
        type: 'text',
        placeholder: '/degree-nit.jpg',
        help: 'Put the file in public/ and write its path here.',
      },
      { name: 'note', label: 'Note', type: 'textarea', wide: true },
    ],
    blank: { title: '', issuer: '', year: '', image: '', note: '' },
  },

  site: {
    key: 'site',
    title: 'Contact & links',
    blurb: 'Your email, social links, CV file and the footer text. Used everywhere they appear.',
    kind: 'single',
    itemName: 'details',
    titleField: 'email',
    fields: [
      {
        name: 'email',
        label: 'Email address',
        type: 'text',
        placeholder: 'you@example.com',
        help: 'Shown in Contact and used by every mail link on the site.',
      },
      { name: 'github', label: 'GitHub link', type: 'url', placeholder: 'https://github.com/…' },
      { name: 'linkedin', label: 'LinkedIn link', type: 'url', placeholder: 'https://www.linkedin.com/in/…' },
      {
        name: 'cv',
        label: 'CV file',
        type: 'text',
        placeholder: '/cv.pdf',
        help: 'Put the PDF in public/ and write its path here. Leave empty to hide the CV links.',
      },
      { name: 'contactSub', label: 'Contact intro line', type: 'textarea', wide: true },
      { name: 'contactNote', label: 'Note under your email', type: 'textarea', wide: true },
      { name: 'footerName', label: 'Footer name', type: 'text', placeholder: 'Manar Gherib' },
      { name: 'footerTagline', label: 'Footer tagline', type: 'textarea', wide: true },
    ],
    blank: {
      email: '', github: '', linkedin: '', cv: '/cv.pdf',
      contactSub: '', contactNote: '', footerName: '', footerTagline: '',
    },
  },

  headings: {
    key: 'headings',
    title: 'Section titles',
    blurb: 'The small label and the big title at the top of every section.',
    kind: 'single',
    itemName: 'titles',
    titleField: 'aboutHeading',
    fields: [
      { name: 'aboutEyebrow', label: 'About: label', type: 'text' },
      { name: 'aboutHeading', label: 'About: title', type: 'text', wide: true },
      { name: 'skillsEyebrow', label: 'Skills: label', type: 'text' },
      { name: 'skillsHeading', label: 'Skills: title', type: 'text', wide: true },
      { name: 'servicesEyebrow', label: 'What I do: label', type: 'text' },
      { name: 'servicesHeading', label: 'What I do: title', type: 'text', wide: true },
      { name: 'projectsEyebrow', label: 'Projects: label', type: 'text' },
      { name: 'projectsHeading', label: 'Projects: title', type: 'text', wide: true },
      { name: 'journeyEyebrow', label: 'Experience: label', type: 'text' },
      { name: 'journeyHeading', label: 'Experience: title', type: 'text', wide: true },
      { name: 'certEyebrow', label: 'Certifications: label', type: 'text' },
      { name: 'certHeading', label: 'Certifications: title', type: 'text', wide: true },
      { name: 'contactEyebrow', label: 'Contact: label', type: 'text' },
      { name: 'contactHeading', label: 'Contact: title', type: 'text', wide: true },
    ],
    blank: {
      aboutEyebrow: '', aboutHeading: '', skillsEyebrow: '', skillsHeading: '',
      servicesEyebrow: '', servicesHeading: '', projectsEyebrow: '', projectsHeading: '',
      journeyEyebrow: '', journeyHeading: '', certEyebrow: '', certHeading: '',
      contactEyebrow: '', contactHeading: '',
    },
  },
}

export const sectionList = Object.values(sections)
