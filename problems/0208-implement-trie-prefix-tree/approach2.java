import java.util.*;
class Trie {
    private static class Node {
        Map<Character, Node> child = new HashMap<>();
        boolean end;
    }
    private final Node root = new Node(); // a node maps each letter to a child node // @viz init
    public Trie() {}
    public void insert(String word) {
        Node node = root; // @viz insert
        for (char ch : word.toCharArray()) // @viz insert
            node = node.child.computeIfAbsent(ch, k -> new Node()); // follow the letter, adding a node if it's missing // @viz insert
        node.end = true; // a word ends here // @viz end
    }
    public boolean search(String word) {
        Node node = walk(word); // @viz search
        return node != null && node.end; // spelled out, and a word ends exactly here // @viz search
    }
    public boolean startsWith(String prefix) {
        return walk(prefix) != null; // spelled out is enough // @viz prefix
    }
    private Node walk(String s) { // the node reached by spelling s, or null // @viz walk
        Node node = root; // @viz walk
        for (char ch : s.toCharArray()) { // @viz walk
            node = node.child.get(ch); // @viz walk
            if (node == null) return null; // @viz walk
        }
        return node; // @viz walk
    }
}
