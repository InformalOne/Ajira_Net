import { TextCanvasComponent } from '~/app/(site)/core/providers/EditorProvider';

export const FONT_FAMILY: Array<{
  label: string;
  value: string;
}> = [
  {
    label: 'Open Sans',
    value: '__Open_Sans_914766'
  },
  {
    label: 'Cursive',
    value: 'cursive'
  },
  {
    label: 'Emoji',
    value: 'emoji'
  },
  {
    label: 'Fantasy',
    value: 'fantasy',
  },
  {
    label: 'Emoji',
    value: 'math'
  },
  {
    label: 'Monospace',
    value: 'monospace'
  },
  {
    label: 'System-ui',
    value: 'system-ui'
  }
];

export const FONT_STYLE: Array<{
  label: string;
  value: string;
}> = [
  {
    label: 'Medium',
    value: 'normal'
  },
  {
    label: 'Bold',
    value: 'bold'
  },
  {
    label: 'Light',
    value: 'lighter'
  },
];

export const FILE_UPLOAD_OPTIONS: Array<{
  label: string;
  value: string;
}> = [
  {
    label: 'Branding Guidelines',
    value: 'branding_guidelines'
  },
  {
    label: 'Tone of Voice',
    value: 'tone_of_voice'
  },
  {
    label: 'Logo',
    value: 'logo'
  },
  {
    label: 'Picture bank',
    value: 'picture_bank'
  },
  {
    label: 'Other',
    value: 'other'
  },
]

export const ASSET_EDITOR_INITIAL_STYLE = {
  texts: [],
  activeText: null,
  setting: {
    appearance: 100,
    fill: {
      enable: false,
      color: '#FFFFFF',
    },
    outline: {
      enable: false,
      color: '#ffffff',
    },
    outlineThickness: 0,
    effects: {
      enable: false,
      color: '#FFFFFF',
      opacity: 70,
    },
    applyAll: false,
  },
}

export const ASSET_TEXT_INITIAL_STYLE: Omit<TextCanvasComponent, 'id'> = {
  position: {
    top: 100,
    left: 100
  },
  dimension: {
    width: "550",
    height: "100",
  },
  content: "STYLE STATEMENT",
  fontFamily: FONT_FAMILY[0].value, // Open_sans
  fontStyle: FONT_STYLE[1].value, // Bold
  fontSize: '60',
  textAlign: 'left',
}
