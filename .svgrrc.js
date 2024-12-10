module.exports = {
  prettierConfig: {
    parser: 'typescript',
  },
  svgo: true,
  svgoConfig: {
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            removeViewBox: false,
            removeUnknownsAndDefaults: false,
          },
        },
      },
    ],
  },
  template(variables, { tpl }) {
    const className = variables.componentName.replace('Svg', '');
    const name = `${className}: FC<SVGProps<SVGSVGElement>>`;

    return tpl`
      import { SVGProps, FC, memo } from 'react';
      export const ${name} = memo((${variables.props}) => (
        ${variables.jsx}
      ));
      
      ${className}.displayName = '${className}';
    `;
  },
};
