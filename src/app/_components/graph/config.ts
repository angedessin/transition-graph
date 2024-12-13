// Rechartsの共通設定はここに記述する
const GRAPH_FONT_SIZE = 10;
const GRAPH_WIDTH = 500;
const GRAPH_HEIGHT = 300;
const GRAPH_MARGIN = {
  top: 5,
  right: 5,
  left: 5,
  bottom: 5,
};

export const AXIS_CONFIG = {
  tick: {
    fontSize: GRAPH_FONT_SIZE,
    fill: '#000',
  },
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
