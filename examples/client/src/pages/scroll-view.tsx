import { ScrollView } from 'high-order-ui'

export const ScrollViewPage = () => {
  return (
    <>
      ↑↓
      <ScrollView
        className="w-full h-[200px]"
        isSmooth
        scrollToPosition={1000}
        onScrollToLower={() => {
          alert('lower')
        }}
        onScrollToUpper={() => {
          alert('upper')
        }}
      >
        <div className="border-4 border-dashed w-full h-[5000px] bg-gradient-to-b from-cyan-500 to-blue-500"></div>
      </ScrollView>
      ←→
      <ScrollView
        scrollDirection="horizontal"
        scrollToPosition={1000}
        className="w-full h-[200px]"
      >
        <div className="border-4 border-dashed w-[5000px] h-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
      </ScrollView>
    </>
  )
}
