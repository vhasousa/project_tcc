import React from 'react';
import { Link } from 'react-router-dom';

import hero from '~/assets/hero.png';
import './styles.css';

// import { Container } from './styles';

export default function Main() {
  return (
    <>
      <div className="container">
        <nav className="nav">
          <ul>
            <li>
              <Link to="/"> Árvore do dinheiro </Link>
            </li>
          </ul>
          <ul>
            <Link to="/login">Entrar</Link>
          </ul>
        </nav>
        <header className="header">
          <img src={hero} alt="mainImg" />
          <div>
            <h1>
              Educação financeira <br /> para jovens.
            </h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
              luctus congue dignissim. Vestibulum et ex nisl. Vestibulum eu
              luctus nisi. Fusce sit amet vehicula nisl.{' '}
            </p>
            <Link to="/register">Faça parte</Link>
          </div>
        </header>

        <main className="main">
          <section className="services">
            <h2>Qual objetivo do projeto?</h2>

            <div className="service-container">
              <div className="services-card service-one" />
              <div className="service-description">
                <h3>Ensinar finanças de forma simples.</h3>
                <div>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse tincidunt massa sem. Vestibulum quis augue ac orci
                  bibendum pellentesque ut nec dolor. Quisque metus ipsum,
                  pulvinar quis ipsum quis, consequat cursus leo. Suspendisse
                  fermentum, nisl et ultricies blandit, mauris metus accumsan
                  mauris, sit amet vulputate elit nunc id libero. Vivamus porta
                  lacus libero, et ullamcorper est volutpat ac. Maecenas eros
                  urna, interdum in lectus nec, tristique semper mauris. Duis
                  finibus nunc sed nulla bibendum, ut ornare tellus finibus.
                  Donec id magna risus.
                </div>
              </div>
            </div>

            <div className="service-container">
              <div className="services-card service-two" />
              <div className="service-description">
                <h3>Forma divertida e interativa de aprender.</h3>
                <div>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse tincidunt massa sem. Vestibulum quis augue ac orci
                  bibendum pellentesque ut nec dolor. Quisque metus ipsum,
                  pulvinar quis ipsum quis, consequat cursus leo. Suspendisse
                  fermentum, nisl et ultricies blandit, mauris metus accumsan
                  mauris, sit amet vulputate elit nunc id libero. Vivamus porta
                  lacus libero, et ullamcorper est volutpat ac. Maecenas eros
                  urna, interdum in lectus nec, tristique semper mauris. Duis
                  finibus nunc sed nulla bibendum, ut ornare tellus finibus.
                  Donec id magna risus.
                </div>
              </div>
            </div>

            <div className="service-container">
              <div className="services-card service-three" />
              <div className="service-description">
                <h3>Pronto para o uso.</h3>
                <div>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse tincidunt massa sem. Vestibulum quis augue ac orci
                  bibendum pellentesque ut nec dolor. Quisque metus ipsum,
                  pulvinar quis ipsum quis, consequat cursus leo. Suspendisse
                  fermentum, nisl et ultricies blandit, mauris metus accumsan
                  mauris, sit amet vulputate elit nunc id libero. Vivamus porta
                  lacus libero, et ullamcorper est volutpat ac. Maecenas eros
                  urna, interdum in lectus nec, tristique semper mauris. Duis
                  finibus nunc sed nulla bibendum, ut ornare tellus finibus.
                  Donec id magna risus.
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
