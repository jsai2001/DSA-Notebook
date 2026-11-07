import java.util.*;
class Trie {
    private final Set<String> words = new HashSet<>(); // just the words // @viz init
    public Trie() {}
    public void insert(String word) {
        words.add(word); // @viz insert
    }
    public boolean search(String word) {
        return words.contains(word); // one hash lookup // @viz search
    }
    public boolean startsWith(String prefix) {
        for (String w : words) // check every word: slow with many words // @viz prefix
            if (w.startsWith(prefix)) return true; // @viz prefix
        return false; // @viz prefix
    }
}
