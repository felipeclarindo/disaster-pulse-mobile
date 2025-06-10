🌍 [Read in English](README.md)

# Disaster Pulse Mobile

Aplicativo móvel para criar alertas e enviar para a população sobre desastres naturais.

## Tecnologias Utilizadas

- `React Native` - Estrutura para a criação de aplicativos móveis multiplataforma.
- `Expo` - Ambiente de desenvolvimento e ferramentas para aplicativos React Native.
- `TypeScript` - Superconjunto JavaScript com tipagem estática.
- `React Navigation` - Navegação entre telas de aplicativos.
- `Api Backend` - API para conectar com o banco de dados

## Funcionalidades

- Crud para gerenciar alertas.
- Painel com resumo do alerta.
- Página para controlar alertas.

## Passos para instalação e execução

1. Clone o repositório:

```bash
git clone https://github.com/felipeclarindo/disaster-pulse-api-dotnet.git
```

2. Entre no diretório:

```bash
cd disaster-pulse-api-dotnet
```

3. Execute as migrations:

```bash
dotnet ef database update --project ./Src/Infra
```

4. Execute a Api:

```bash
dotnet run --project ./Src/WebApi
```

5. Clone o repositório:

```bash
git clone https://github.com/felipeclarindo/disaster-pulse-mobile.git
```

6. Entre no diretório:

```bash
cd disaster-pulse-mobile
```

7. Instale as dependências:

```bash
npm install
```

8. Certifique-se de ter um dispositivo android para visualizar o app(emulador ou via depuracao).

9. Execute o app:

```bash
npx expo start
```

10. Pressione `A` para abrir o aplicativo no android.

## Contribuição

Contribuições são bem-vindas! Se você tiver sugestões de melhorias, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Autor

### **Felipe Clarindo**

- [LinkedIn](https://www.linkedin.com/in/felipeclarindo)
- [Instagram](https://www.instagram.com/lipethecoder)
- [GitHub](https://github.com/felipeclarindo)

## Licença

Este projeto está licenciado sob a [GNU Affero License](https://www.gnu.org/licenses/agpl-3.0.html).
