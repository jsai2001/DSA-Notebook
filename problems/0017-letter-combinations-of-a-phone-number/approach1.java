import java.util.ArrayList;
import java.util.List;

class Solution {
    private static final String[] LETTERS = {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};

    public List<String> letterCombinations(String digits) {
        List<String> combos = new ArrayList<>();
        if (digits.isEmpty()) return combos; // no digits: no combinations (not [""]) // @viz empty
        combos.add(""); // one way to spell nothing so far // @viz init
        for (char d : digits.toCharArray()) { // @viz digit
            // every combination so far, extended by every letter of this digit
            List<String> next = new ArrayList<>(); // @viz extend
            for (String c : combos) // @viz extend
                for (char ch : LETTERS[d - '0'].toCharArray()) next.add(c + ch); // @viz extend
            combos = next; // @viz extend
        }
        return combos; // @viz return
    }
}
