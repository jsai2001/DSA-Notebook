import java.util.*;
class WordDictionary {
    private final List<String> words = new ArrayList<>(); // @viz init
    public WordDictionary() {}
    public void addWord(String word) {
        words.add(word); // @viz add
    }
    public boolean search(String word) {
        for (String w : words) { // try every word // @viz scan
            if (w.length() != word.length()) continue; // @viz scan
            int i = 0; // @viz scan
            while (i < w.length() && (word.charAt(i) == '.' || word.charAt(i) == w.charAt(i))) i++; // "." matches any letter // @viz scan
            if (i == w.length()) return true; // @viz found
        }
        return false; // @viz none
    }
}
