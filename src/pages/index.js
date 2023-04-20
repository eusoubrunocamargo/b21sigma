import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { useEffect, useRef, useState } from 'react'
import { useVisible } from '@/hooks/useVisible';

export default function Home() {

  const [scrollPosition, setScrollPosition] = useState(0);
  const treasuryRef = useRef();
  const isVisible = useVisible(treasuryRef);
  const [counter, setCounter] = useState({
    counter1: 0,
    counter2: 0,
    counter3: 0,
  });
  const [counterStarted, setCounterStarted] = useState(false);

  const animateCounter = () => {
    const duration = 2000;
    const startValues = { counter1: 0, counter2: 0, counter3: 0};
    const endValues = {counter1: 258, counter2: 389, counter3: 30};
    const startTime = performance.now();

    const updateValues = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime/duration,1);

      const updateCounters = {
        counter1: Math.floor(startValues.counter1 + (endValues.counter1 - startValues.counter1) * progress),
        counter2: Math.floor(startValues.counter2 + (endValues.counter2 - startValues.counter2) * progress),
        counter3: Math.floor(startValues.counter3 + (endValues.counter3 - startValues.counter3) * progress),
      };

      setCounter(updateCounters);

      if(progress < 1){
        requestAnimationFrame(updateValues);
      }
    };

    requestAnimationFrame(updateValues);
  };

  useEffect(() => {
    if(isVisible && !counterStarted){
      setCounterStarted(true);
      animateCounter();
    }
  }, [isVisible]);

  useEffect(()=> {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  },[]);

  const showShadow = scrollPosition > 100;

  const [openCarouselItem, setOpenCarouselItem] = useState(0);

  const handleCarouselItem = (index) => {
    setOpenCarouselItem(openCarouselItem === index ? openCarouselItem : index);
  };

  const getClassName = (commomClass,index) => {
    if(openCarouselItem === index){
      return `${commomClass} ${styles.open}`;
    }
    return `${commomClass} ${styles.close}`;
  }

  return (
    <>
      <main className={styles.main}>
       
       <header className={`${styles.containerHeader} ${showShadow && styles.headerShadow}`}>
        <div className={styles.containerLogo}>
          {!showShadow && <Image src='/logo_w.svg' priority width={50} height={50} alt='logomarca'/>}
          {showShadow && <Image src='/logo_d.svg' priority width={50} height={50} alt='logomarca'/>}
          <span style={{ color: `${!showShadow? '#F0F0F0':'#333333'}`}}>B21Σ</span>
        </div>
        <button className={`${styles.btnInvestir} ${showShadow && styles.btnInvestirDark}`}>QUERO INVESTIR</button>
       </header>

       <picture className={styles.pictureHero}>
        <Image src='/main_hero.png' alt='imagem' priority fill style={{
          objectFit:'cover',
          opacity: 0.95,
          }}/>
       </picture>

       <section className={styles.containerMainSection}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}>
        <span style={{
          fontSize: '5rem', 
          color: '#333333',
          textAlign: 'center',
          lineHeight: '6rem',
          color: 'whitesmoke',
          }}>Seu acesso seguro aos investimentos digitais</span>
        <span style={{
          fontSize: '2rem', 
          color: '#333333',
          textAlign: 'center',
          lineHeight: '3rem',
          color: 'white'
          }}>
        Invista com tranquilidade em um portfólio exclusivo e seguro de criptoativos. Com a B21Sigma, construa um futuro próspero e desfrute da segurança que você merece.
        </span>
        </div>
        <div className={styles.treasury} ref={treasuryRef}>
          <span style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            fontFamily: `'Open Sans', sans-serif`,
            }}>Sob nossa custódia:</span>
          <span className={styles.counter}>R$1.{counter.counter1}.{counter.counter2},{counter.counter3}</span>
        </div>
       </section>

       <section className={styles.containerWhatWeDo}>
        <span style={{
          fontSize: '3rem',
          lineHeight: '4rem',
          textAlign: 'center',
        }}>Uma seleção <strong>completa</strong> e <strong>transparente</strong> dos melhores e mais promissores criptoativos  </span>
        
        <div className={styles.containerCarousel}>

          <div
          className={getClassName(styles.itemCarousel,0)} 
          onClick={() => handleCarouselItem(0)}>
            <Image src='/bitcoin.svg' width={100} height={100} priority alt='bitcoin' style={{
              position:'relative',
            }}/>
            {openCarouselItem !== 0 && <span style={{
              color: '#333333',
              transform: 'rotate(270deg)',
              fontSize: '2rem',
              padding: '3rem',
            }}>Bitcoin</span>}
            {openCarouselItem === 0 && <span style={{
              fontSize: '1.5rem',
              lineHeight: '3rem',
              textAlign: 'center'
            }}><strong style={{fontSize: '3rem'}}>Bitcoin</strong><br/>A moeda digital pioneira que revolucionou o mundo financeiro. Pense no Bitcoin como dinheiro virtual, permitindo pagamentos rápidos e seguros, sem a necessidade de uma instituição financeira. Assim como o ouro é escasso, o BTC tem suas unidades limitadas.</span>}
          </div>

          <div 
          className={getClassName(styles.itemCarousel,1)} 
          onClick={() => handleCarouselItem(1)}>
            <Image src='/eth.svg' width={100} height={100} priority alt='ethereum' style={{
              position:'relative',
          
            }}/>
            {openCarouselItem !== 1 && <span style={{
              color: '#333333',
              transform: 'rotate(270deg)',
              fontSize: '2rem',
              padding: '3rem',
            }}>Ethereum</span>}
            {openCarouselItem === 1 && <span style={{
              fontSize: '1.5rem',
              lineHeight: '3rem',
              textAlign: 'center'
            }}><strong style={{fontSize: '3rem'}}>Ethereum</strong><br/>Além de ser uma criptomoeda, o Ethereum é uma plataforma que permite a criação de aplicativos descentralizados. Os contratos inteligentes possibilitam, por exemplo, o aluguel de um carro ou uma casa sem burocracia.</span>}
          </div>

          <div 
          className={getClassName(styles.itemCarousel,2)} 
          onClick={() => handleCarouselItem(2)}>
                        <Image src='/link.svg' width={100} height={100} priority alt='chainlink' style={{
              position:'relative',
          
            }}/>
            {openCarouselItem !== 2 && <span style={{
              color: '#333333',
              transform: 'rotate(270deg)',
              fontSize: '2rem',
              padding: '3rem',
            }}>Chainlink</span>}
            {openCarouselItem === 2 && <span style={{
              fontSize: '1.5rem',
              lineHeight: '3rem',
              textAlign: 'center'
            }}><strong style={{fontSize: '3rem'}}>Chainlink</strong><br/>Chainlink conecta contratos inteligentes a dados do mundo real, possibilitando uma infinidade de aplicações práticas. É como se fosse a ponte entre o mundo digital e o mundo físico, ampliando as possibilidades do blockchain.</span>}

          </div>

        </div>

       </section>

       <section className={styles.taxasNegocio}>
        <span style={{
          fontSize: '5rem',
        }}>Como funciona?</span>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{
            width: '5rem',
            height: '5rem',
            backgroundColor: 'whitesmoke',
            aspectRatio: '1/1',
            borderRadius: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#333333',
          }}>1</div>
          <span>Abra sua conta</span>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{
            width: '5rem',
            height: '5rem',
            backgroundColor: 'whitesmoke',
            aspectRatio: '1/1',
            borderRadius: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#333333',
          }}>2</div>
          <span>Informe quanto quer investir e transfira os recursos</span>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{
            width: '5rem',
            height: '5rem',
            backgroundColor: 'whitesmoke',
            aspectRatio: '1/1',
            borderRadius: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#333333',
          }}>3</div>
          <span>Acompanhe seus investimentos pelo nosso app</span>
        </div>
        <details>
          <summary style={{
            fontSize: 'small',
            fontWeight: 'bold',
          }}>Clique aqui para conhecer nossas taxas e regras de retiradas</summary>
          <p style={{
            backgroundColor: '#D9D7DD',
            color: '#333333',
            padding: '0.5rem',
          }}>Taxa zero para depósitos e custódia dos ativos. Taxa de 1% para retiradas.
          Regras para retiradas: Máximo de uma retirada por mês, nossa plataforma foca em 
          investimentos de médio e longo prazo para construção de riqueza. Taxa de performance:
          20% sobre o que exceder o o dobro do CDI.
          </p>
        </details>
       </section>

       <section className={styles.safetySolution}>
        <div>
          <h1>Segurança em primeiro lugar</h1>
          <Image src='/safe.png' priority width={100} height={100} alt='safe/>'/>
          <span>Garantimos a proteção dos seus investimentos através do uso de cold storage, armazenando seus ativos em dispositivos desconectados da internet. Invista conosco e tenha a tranquilidade de saber que seu patrimônio está resguardado de forma segura e confiável.</span>
        </div>
       </section>

       <picture className={styles.openAcc}>
          <Image style={{
            objectFit:'cover',
          }} src='/image2.png' fill priority alt='imagem'/>
          <div>
            <button>Abra sua conta</button>
          </div>
       </picture>

       <footer>
          <div className={styles.containerLogo}>
            <Image src='/logo_w.svg' priority width={50} height={50} alt='logomarca'/>
            <span style={{ color: '#F0F0F0'}}>B21Σ</span>
          </div>
          <span style={{
            gridRow: '2',
          }}>B21Sigma - Custódia e Curadoria de Ativos Digitais</span>
          <span style={{
            gridRow: '3',
          }}>Políticas de Privacidade e Termos de Uso</span>
          <span style={{
            gridRow: '4',
          }}>contato@b21sigma.com.br</span>
          <span style={{
            gridRow: '5',
          }}>Brasília, DF</span>
          <span style={{
            gridRow: '6',
          }}>© 2023 B21Sigma. Todos os direitos reservados.</span>
       </footer>
      </main>
    </>
  )
}
