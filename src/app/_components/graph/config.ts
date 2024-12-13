// Rechartsの共通設定はここに記述する
const GRAPH_FONT_SIZE = 10;
const GRAPH_WIDTH = 500;
const GRAPH_HEIGHT = 300;
const GRAPH_MARGIN = {
  top: 40,
  right: 20,
  left: 20,
  bottom: 40,
};

export const AXIS_CONFIG = {
  tick: {
    fontSize: GRAPH_FONT_SIZE,
    fill: '#000',
  },
};

export const AXIS_LABEL_FONT_STYLE = {
  fontSize: 12,
  fontWeight: 'bold',
};

export const TOOLTIP_CONFIG = {
  contentStyle: {
    fontSize: GRAPH_FONT_SIZE,
  },
};

export const GRAPH_LAYOUT = {
  width: GRAPH_WIDTH,
  height: GRAPH_HEIGHT,
  margin: GRAPH_MARGIN,
};

export const LEGEND_WRAPPER_STYLE_CONFIG = {
  fontSize: 12,
  fontWeight: 'bold',
  margin: '-20px 0',
};
