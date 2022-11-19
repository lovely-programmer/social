import LayoutWrapper from "../../components/LayoutWrapper"
import Posts from "../../components/Posts"
import Stories from "../../components/Stories"
import Share from "../../components/Share"
import "./home.scss"

function Home() {
  return (
    <LayoutWrapper>
      <div className="home">
        <Stories />
        <Share />
        <Posts userId={undefined}  />
      </div>
    </LayoutWrapper>
  )
}

export default Home