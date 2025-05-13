// import { Link } from 'react-router-dom';
import MainLogin from '../components/BattlePage/index.tsx';
import LegendsSection from '../components/Home/LegendsSelection.tsx';
import NewEraSection from '../components/Home/NewEraSection.tsx';
import './CSS/home.css';



const Home = () => {
  return (
    <div className="page-wrapper">
    <main className= "home-page main-content simulation">
      {/* Flanked Hero Header */}
      <div className="flanked-header">
        <LegendsSection />

        <header className="home-header text-center py-5">
          <h1 className="display-4 text-light">Welcome to Legacy League</h1>
          {/* <p className="lead text-light">!</p> */}
          {/* <div>
            <Link to="/about"
            className="btn btn-info m-2">
              Legends</Link>
            
          </div> */}
        </header>

        <NewEraSection />
      </div>

      {/* Rest of the page */}
      <section className="content-section py-5">
        <h2 className="text-center mb-4 text-light"></h2>
        <div className="row justify-center">
          <div className="col-12 col-md-8">
            <MainLogin />
          </div>
        </div>
      </section>

    </main>
    </div>
  );
};

export default Home;
