import React from 'react';
import { Link } from 'react-router-dom';

import hero from '~/assets/hero.png';
import logo from '~/assets/logo.png';
import './styles.css';

// import { Container } from './styles';

export default function Main() {
  return (
    <>
      <div className="container">
        <nav className="nav">
          <ul>
            <li>
              <img src={logo} alt="imgLogo" />
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
              Uma aplicação voltada para crianças e adolescente com intuito de
              ensinar educação financeira de forma divertida, através de
              metodologias de ensino atuais.{' '}
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
                  Educação financeira é um assunto que ultimamente tem sido
                  discutido sobre a sua importância e inserir essa matéria no
                  currículo escolar. A melhor fase para a introdução desse
                  assunto é quando criança. Para isso, o conteúdo disponibilzado
                  na plataforma segue o material didático da AEF - Brasil.
                </div>
              </div>
            </div>

            <div className="service-container">
              <div className="services-card service-two" />
              <div className="service-description">
                <h3>Forma divertida e interativa de aprender.</h3>
                <div>
                  Metodologias ativas são a base nas quais os conteúdos serão
                  consumidos. Os alunos terão um papel ativo no processo de
                  contrução de seu conhecimento. Isso se dará através da
                  gamificação em que terá uma forma de ranking e opções de
                  tomadas de decisão dentro das atividades propostas.
                </div>
              </div>
            </div>

            <div className="service-container">
              <div className="services-card service-three" />
              <div className="service-description">
                <h3>Pronto para o uso.</h3>
                <div>
                  A aplicação será fornecida como uma solução completa de
                  inserção de um projeto de educação financeira nas escolas. Com
                  um valor única a escola dará acesso aos seus alunos a
                  plataforma. Detalhe, essa aplicação não precisará de um
                  infraestrutura interna das escolas, o acesso pode ser feito
                  simplesmente através de um navegador de internet.
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
