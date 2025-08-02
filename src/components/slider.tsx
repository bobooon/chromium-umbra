import type { SliderProps as RadixSliderProps } from '@radix-ui/themes'
import { Box, Flex, Slider as RadixSlider, Text } from '@radix-ui/themes'
import UiTooltip from './tooltip.tsx'

interface SliderProps extends RadixSliderProps {
  label: string
  tooltip?: string
  unit: string
}

export default function Slider(props: SliderProps) {
  const { label, tooltip, unit, ...restProps } = props

  return (
    <Box>
      <Flex align="center" gap="2" mb="2">
        {tooltip && <UiTooltip.Info content={tooltip} />}
        <Text size="2" style={{ flexGrow: 1 }}>
          {label}
        </Text>
        {props.defaultValue && (
          <Text size="2" style={{ opacity: 0.6 }}>
            {props.defaultValue[0]}
            {unit}
          </Text>
        )}
      </Flex>
      <RadixSlider {...restProps} />
    </Box>
  )
}
