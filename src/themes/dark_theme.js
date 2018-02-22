import * as Colors from 'material-ui/styles/colors'
import * as ColorManipulator from 'material-ui/utils/colorManipulator'
import Spacing from 'material-ui/styles/spacing'
import zIndex from 'material-ui/styles/zIndex'
// import { colors } from 'duchunet-utils'

export default {
  spacing: Spacing,
  zIndex: zIndex,
  // fontFamily: 'spaceone',
  borderRadius: 2,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: Colors.blue600,
    // primary1Color: colors.convertHexToRGBA(Colors.cyan500, 0.7),
    primary2Color: Colors.blue600,
    primary3Color: Colors.grey600,
    accent1Color: Colors.red600,
    accent2Color: Colors.red400,
    accent3Color: Colors.red100,
    textColor: '#3EB3F6', //Colors.fullWhite,
    // secondaryTextColor: ColorManipulator.fade(Colors.fullWhite, 0.7),
    secondaryTextColor: Colors.fullWhite,
    alternateTextColor: '#303030',
    canvasColor: 'rgba(0,0,0,0.9)', //'#303030',
    shadowColor: Colors.blue600,
    borderColor: ColorManipulator.fade(Colors.fullWhite, 0.5), // 0,3
    disabledColor: ColorManipulator.fade(Colors.fullWhite, 0.3),
    pickerHeaderColor: ColorManipulator.fade(Colors.fullWhite, 0.12),
    clockCircleColor: ColorManipulator.fade(Colors.fullWhite, 0.12),
  },
  appBar: {
    color: 'rgba(0,0,0,0.8)', //colors.convertHexToRGBA(Colors.cyan500, 0.7),
    textColor: Colors.fullWhite,
    // height: spacing.desktopKeylineIncrement,
    // titleFontWeight: typography.fontWeightNormal,
    // padding: spacing.desktopGutter,
  },
  toolbar: {
    // color: fade(palette.textColor, 0.54),
    // hoverColor: fade(palette.textColor, 0.87),
    backgroundColor: 'rgba(0,0,0,0.8)',//darken(palette.accent2Color, 0.05),
    // height: 56,
    // titleFontSize: 20,
    // iconColor: fade(palette.textColor, 0.4),
    // separatorColor: fade(palette.textColor, 0.175),
    // menuHoverColor: fade(palette.textColor, 0.1),
  },
  // tooltip: {
  //   color: white,
  //   rippleBackgroundColor: grey700,
  // },
}
