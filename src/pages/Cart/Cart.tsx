import { useEffect, useState, ChangeEvent } from "react";
import { Box } from "@mui/material";
import { Button, Card, TextField, Typography } from "@material-ui/core";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { TokenState } from "../../store/tokens/tokensReducer";

import Produto from "../../models/Produto";
import { buscaId } from "../../services/Service";

import "./Cart.css";

function Cart() {
  let history = useNavigate();

  // Assim como no FormularioPostagem, pegamos o Id do Produto pela URL
  const { id } = useParams<{ id: string }>();

  // Substituir para o uso com Redux
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );

  // State para guardar a quantidade escolhida pela P. Usuaria
  const [quantidadeFinal, setQuantidadeFinal] = useState(0);

  // State para guardar as informações do Produto retornadas pelo Back
  const [produto, setProduto] = useState<Produto>({
    id: 0,
    nome: "Copo Fibra de Bambu Branco",
    preco: 39.9,
    estoque: 10,
    foto: "https://i.imgur.com/7NKJaFG.png",
  });

  // Vai disparar a função findByIdProduto sempre que o ID for diferente que Undefined
  useEffect(() => {
    if (id !== undefined) {
      findByIdProduto(id);
    }
  }, [id]);

  // Esse Código irá pegar o ID do Produto, e acessar a service que busca as informações por ID
  async function findByIdProduto(id: string) {
    await buscaId(`produtos/${id}`, setProduto, {
      headers: {
        Authorization: token,
      },
    });
  }

  // Função que vai pegar a quantidade escolhida do Produto
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    let valor = +e.target.value;
    setQuantidadeFinal(valor);
  }

  // Função que mostra o valor total entre a quantidade e o valor unitário do item. Ex.: 2 * R$2 = 4
  function valorTotal() {
    return (quantidadeFinal * produto.preco).toFixed(2);
  }

  // Função que simula a compra Efetuada com sucesso
  function confirmSales() {
    alert("Compra Confirmada! Verifique o seu email!");
    history("/home");
  }

  return (
    <>
      <Box m={2} display="flex" justifyContent="center">
        <Card variant="outlined" className="cardContainer">
          <div className="cardProduct">
            <img src={produto.foto} alt="Img" className="img-carrinho" />

            <div className="cardProductInfo">
              <Typography color="textSecondary" gutterBottom>
                Produto
              </Typography>

              <Typography variant="h5" component="h2">
                {produto.nome}
              </Typography>

              <Typography variant="body2" component="p">
                R$ {produto.preco}
              </Typography>

              <Typography variant="body2" component="p">
                Quantidade Máx: {produto.estoque}
              </Typography>

              <TextField
                value={quantidadeFinal}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                InputProps={{
                  inputProps: { min: 1, max: produto.estoque },
                  className: "quantidadeInput",
                }}
                id="quantidade"
                label={
                  <Typography className="quantidadeLabel">
                    Quantidade
                  </Typography>
                }
                type="number"
                variant="outlined"
                name="quantidade"
                margin="normal"
                fullWidth
              />

              <Typography variant="body2" component="p">
                Total: R$ {valorTotal()}
              </Typography>
            </div>
          </div>
        </Card>

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          mb={1.5}
          className="box-buttons"
        >
          <Link to="/home" className="cardProductButton">
            <Box className="cardProductButton">
              <Box mx={1}>
                <Button
                  onClick={confirmSales}
                  variant="contained"
                  size="small"
                  color="primary"
                >
                  Confimar Compra
                </Button>
              </Box>
            </Box>
          </Link>

          <Link to="/home" className="cardProductButton">
            <Box mx={1}>
              <Button variant="contained" size="small" color="secondary">
                Cancelar
              </Button>
            </Box>
          </Link>
        </Box>
      </Box>
    </>
  );
}

export default Cart;
