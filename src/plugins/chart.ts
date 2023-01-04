import { Chart, Legend, Title, Tooltip } from 'chart.js'

Chart.register(Legend, Title, Tooltip)

Chart.defaults.font.lineHeight = 1.5
Chart.defaults.layout.padding = 16
Chart.defaults.plugins.legend.display = false
Chart.defaults.plugins.title.display = false
