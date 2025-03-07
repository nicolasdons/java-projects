import java.util.ArrayList;
import java.util.Scanner;

class Produto {
    private String nome;
    private double preco;
    private int quantidade;
    private double peso;
    private String validade;
    private String marca;

    public Produto(String nome, double preco, double peso, String validade, String marca) {
        this.nome = nome;
        this.preco = preco;
        this.quantidade = 0; // Inicia com 0 no estoque
        this.peso = peso;
        this.validade = validade;
        this.marca = marca;
    }

    public String getNome() { return nome; }
    public double getPreco() { return preco; }
    public int getQuantidade() { return quantidade; }
    public double getPeso() { return peso; }
    public String getValidade() { return validade; }
    public String getMarca() { return marca; }

    public void adicionarEstoque(int quantidade) {
        this.quantidade += quantidade;
    }

    public boolean removerEstoque(int quantidade) {
        if (this.quantidade >= quantidade) {
            this.quantidade -= quantidade;
            return true;
        } else {
            return false;
        }
    }

    @Override
    public String toString() {
        return "Nome: " + nome + ", Preco: " + preco + ", Quantidade: " + quantidade + ", Peso: " + peso + "kg, Validade: " + validade + ", Marca: " + marca;
    }
}

class ControleEstoque {
    private ArrayList<Produto> produtos = new ArrayList<>();

    public void adicionarProduto(Produto produto) {
        produtos.add(produto);
    }

    public void listarProdutos() {
        if (produtos.isEmpty()) {
            System.out.println("Nenhum produto cadastrado.");
        } else {
            for (Produto p : produtos) {
                System.out.println(p);
            }
        }
    }

    public boolean removerProduto(String nome) {
        return produtos.removeIf(p -> p.getNome().equalsIgnoreCase(nome));
    }

    public Produto buscarProduto(String nome) {
        for (Produto p : produtos) {
            if (p.getNome().equalsIgnoreCase(nome)) {
                return p;
            }
        }
        return null;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        ControleEstoque estoque = new ControleEstoque();
        int opcao;

        do {
            System.out.println("\n[1] Novo Produto\n[2] Listar Produtos\n[3] Remover Produto\n[4] Entrada Estoque\n[5] Saída Estoque\n[0] Sair");
            System.out.print("Escolha uma opção: ");
            opcao = scanner.nextInt();
            scanner.nextLine();

            switch (opcao) {
                case 1:
                    System.out.print("Nome: ");
                    String nome = scanner.nextLine();
                    System.out.print("Preço: ");
                    double preco = scanner.nextDouble();
                    System.out.print("Peso (kg): ");
                    double peso = scanner.nextDouble();
                    scanner.nextLine(); // Consumir quebra de linha
                    System.out.print("Validade: ");
                    String validade = scanner.nextLine();
                    System.out.print("Marca: ");
                    String marca = scanner.nextLine();
                    estoque.adicionarProduto(new Produto(nome, preco, peso, validade, marca));
                    break;
                case 2:
                    estoque.listarProdutos();
                    break;
                case 3:
                    System.out.print("Nome do produto a remover: ");
                    String nomeRemover = scanner.nextLine();
                    if (estoque.removerProduto(nomeRemover)) {
                        System.out.println("Produto removido com sucesso.");
                    } else {
                        System.out.println("Produto não encontrado.");
                    }
                    break;
                case 4:
                    System.out.print("Nome do produto para entrada: ");
                    String nomeEntrada = scanner.nextLine();
                    Produto produtoEntrada = estoque.buscarProduto(nomeEntrada);
                    if (produtoEntrada != null) {
                        System.out.print("Quantidade a adicionar: ");
                        int quantidade = scanner.nextInt();
                        produtoEntrada.adicionarEstoque(quantidade);
                    } else {
                        System.out.println("Produto não encontrado.");
                    }
                    break;
                case 5:
                    System.out.print("Nome do produto para saída: ");
                    String nomeSaida = scanner.nextLine();
                    Produto produtoSaida = estoque.buscarProduto(nomeSaida);
                    if (produtoSaida != null) {
                        System.out.print("Quantidade a remover: ");
                        int quantidadeSaida = scanner.nextInt();
                        if (produtoSaida.removerEstoque(quantidadeSaida)) {
                            System.out.println("Removido com sucesso.");
                        } else {
                            System.out.println("Quantidade insuficiente.");
                        }
                    } else {
                        System.out.println("Produto não encontrado.");
                    }
                    break;
                case 0:
                    System.out.println("Saindo...");
                    break;
                default:
                    System.out.println("Opção inválida!");
            }
        } while (opcao != 0);

        scanner.close();
    }
}
