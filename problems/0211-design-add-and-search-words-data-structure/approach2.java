import java.util.*;
class WordDictionary {
    private final Map<Integer, Set<String>> byLen = new HashMap<>(); // length -> the set of words with that length // @viz init
    public WordDictionary() {}
    public void addWord(String word) {
        byLen.computeIfAbsent(word.length(), k -> new HashSet<>()).add(word); // @viz add
    }
    public boolean search(String word) {
        Set<String> words = byLen.get(word.length()); // only words of the same length can match // @viz group
        if (words == null) return false; // @viz group
        if (word.indexOf('.') < 0) return words.contains(word); // no wildcard: one hash lookup // @viz exact
        for (String w : words) { // @viz scan
            int i = 0; // @viz scan
            while (i < w.length() && (word.charAt(i) == '.' || word.charAt(i) == w.charAt(i))) i++; // @viz scan
            if (i == w.length()) return true; // @viz scan
        }
        return false; // @viz scan
    }
}
