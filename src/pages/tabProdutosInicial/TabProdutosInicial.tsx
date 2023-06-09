import { Box, Tabs, Typography } from "@material-ui/core";
import { TabContext, TabPanel } from "@material-ui/lab";
import { AppBar, Tab } from "@mui/material";
import { useState } from "react";
import ProdutosInicial from "../produtosInicial/ProdutosInicial";
import "./TabProdutosInicial.css";

function TabProdutosInicial() {
  const [value, setValue] = useState("1");
  function handleChange(event: React.ChangeEvent<{}>, newValue: string) {
    setValue(newValue);
  }

  return (
    <>
      <TabContext value={value}>
        <AppBar position="relative">
          <Tabs centered className="tabs" onChange={handleChange}>
            <Tab
              label="Veja aqui nossos produtos"
              value="1"
              className="tab-text"
            />
            <Tab label="Nossa Cultura" value="2" className="tab-text" />
          </Tabs>
        </AppBar>
        <TabPanel value="1">
          <Box display="flex" flexWrap="wrap" justifyContent="center">
            <ProdutosInicial />
          </Box>
        </TabPanel>
        <TabPanel value="2">
          <Typography
            variant="body1"
            gutterBottom
            align="justify"
            className="text-sobre"
          >
            <div className="flex-container">
              <div>
                <p>
                  A Kod-Eco é uma empresa de e-commerce especializada em
                  oferecer produtos biodegradáveis e ecológicos para indivíduos
                  conscientes e comprometidos com a preservação do meio
                  ambiente. Nosso objetivo é promover um estilo de vida
                  sustentável e responsável, por meio da oferta de uma ampla
                  variedade de produtos que apresentam alternativas ecológicas
                  aos produtos convencionais. Em nossa loja virtual, os clientes
                  têm acesso a uma ampla gama de produtos, desde artigos de
                  cuidados pessoais, como shampoos e sabonetes, até produtos
                  para o lar, incluindo sacolas biodegradáveis e talheres
                  reutilizáveis, entre outros. Todos os nossos produtos são
                  selecionados cuidadosamente, levando em consideração critérios
                  de qualidade, eficácia e impacto ambiental.
                </p>
              </div>
              <div>
                <p>
                  Além de oferecer produtos ecológicos, estamos empenhados em
                  fornecer informações úteis e orientações aos nossos clientes,
                  para que possam tomar decisões mais conscientes sobre suas
                  escolhas de consumo. Além disso, oferecemos opções de envio
                  sustentáveis, utilizando embalagens biodegradáveis e evitando
                  o uso desnecessário de plásticos. Na Kod-Eco, assumimos um
                  compromisso sério com a sustentabilidade e trabalhamos
                  arduamente para garantir que nossos clientes tenham acesso aos
                  melhores produtos e serviços possíveis. Junte-se a nós em
                  nossa missão de construir um futuro mais sustentável e
                  responsável para o nosso planeta.
                </p>
              </div>
            </div>
          </Typography>
        </TabPanel>
      </TabContext>
    </>
  );
}

export default TabProdutosInicial;
