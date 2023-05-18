import { Inter } from 'next/font/google'
import { Card, Text, Metric, Grid, Col, AreaChart, Flex, Title, Subtitle } from '@tremor/react'

const inter = Inter({ subsets: ['latin'] })

/**
 * Datos de ejemplo sacados del repositorio de GitHub proporcionado por Rodrigo.
 */
const categories: {
  title: string
  metric: string
  metricPrev: string
}[] = [
  {
    title: 'Sales',
    metric: '$ 12,699',
    metricPrev: '$ 9,456'
  },
  {
    title: 'Profit',
    metric: '$ 40,598',
    metricPrev: '$ 45,564'
  },
  {
    title: 'Customers',
    metric: '1,072',
    metricPrev: '856'
  }
]

const chartData: {
  date: string
  Sales: Number
  Profit: Number
}[] = [
  {
    date: "Jan 22",
    Sales: 2890,
    Profit: 2338,
  },
  {
    date: "Feb 22",
    Sales: 2756,
    Profit: 2103,
  },
  {
    date: "Mar 22",
    Sales: 3322,
    Profit: 2194,
  },
]

/**
 * Formateador para el eje Y del grafico.
 */
const dataFormatter = (number: number) => {
  return "$ " + Intl.NumberFormat("us").format(number).toString();
}

/**
 * Renderiza los graficos hechos con Tremor y los datos de prueba proporcionados.
 */
export default function Home() {
  return (
    <>
      <Grid numCols={1} numColsMd={3} className="gap-8 m-5">
        {categories.map((item) => (
          <Col numColSpan={3} numColSpanMd={1} key={item.title}>
            <Card>
              <Flex alignItems="start">
                <Text>{item.title}</Text>
              </Flex>
              <Flex
                className="space-x-3 truncate"
                justifyContent="start"
                alignItems="baseline"
              >
                <Metric>{item.metric}</Metric>
                <Text className="truncate">from {item.metricPrev}</Text>
              </Flex>
            </Card>
          </Col>
        ))}
        <Col numColSpan={3}>
          <Card>
            <Title>Performance</Title>
            <Subtitle>Comparison between Sales and Profit</Subtitle>
            <AreaChart
              className="h-72 mt-4"
              data={chartData}
              index="date"
              categories={["Sales", "Profit"]}
              valueFormatter={dataFormatter}
            />
          </Card>
        </Col>
      </Grid>
    </>
  )
}