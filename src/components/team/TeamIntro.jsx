import { Link } from 'react-router-dom'
import { team } from '../../data/team'
import '../common/Page.css'
import './TeamIntro.css'

function TeamIntro() {
  return (
    <section className="team-intro" aria-labelledby="team-intro-title">
      <div className="team-intro__copy">
        <p className="eyebrow">APRENDER. CREAR. COMPARTIR.</p>
        <h2 id="team-intro-title">{team.name}<span>Construimos en equipo.</span></h2>
        <p className="team-intro__description">{team.description}</p>
        <div className="team-intro__actions">
          <a className="page-button" href="#team-members">Conocé al equipo <span aria-hidden="true">↗</span></a>
          <Link className="team-intro__secondary" to="/datos">Explorar recursos <span aria-hidden="true">→</span></Link>
        </div>
      </div>
      <div className="team-intro__art" aria-hidden="true">
        <div className="orbit orbit--one" /><div className="orbit orbit--two" />
        <div className="art-window"><div className="art-window__bar"><i /><i /><i /><span>ideas en desarrollo</span></div><div className="art-window__code">&lt;<span>equipo</span> /&gt;</div><div className="art-window__line" /><div className="art-window__line art-window__line--short" /><div className="art-window__tags"><span>Diseño</span><span>Código</span><span>Ideas</span></div></div>
        <span className="art-note">✦ Mejor, juntos.</span>
      </div>
    </section>
  )
}
export default TeamIntro
