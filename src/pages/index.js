import RootLayout from "@/components/Layouts/RootLayout";

export default function HomePage() {
  return <h1>This PC Builder Home Page</h1>;
}

HomePage.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      {page}
    </RootLayout>
  )
}
