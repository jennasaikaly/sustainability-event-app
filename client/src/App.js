import './App.css';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Footer from './components/Footer';
import Nav from './components/Nav';
import Search from './components/Search';

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
    <div>
    </div>
    </ApolloProvider>
  );
}

export default App;
