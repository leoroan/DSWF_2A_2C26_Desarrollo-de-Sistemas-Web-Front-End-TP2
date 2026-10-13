import PageHeader from "../../components/common/PageHeader";
import TeamIntro from "../../components/team/TeamIntro";

/** Portada del equipo (ruta /). */
function Home() {
  return (
    <>
      <PageHeader
        title="Nuestro espacio de trabajo"
        description="Personas, recursos y aprendizajes. Todo conectado en un mismo lugar."
      />

      <TeamIntro />
    </>
  );
}

export default Home;
