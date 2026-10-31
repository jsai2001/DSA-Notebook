import java.util.ArrayList;
import java.util.List;

class Solution {
    private static final String[] LETTERS = {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
    private List<String> result;
    private StringBuilder path;

    public List<String> letterCombinations(String digits) {
        result = new ArrayList<>(); // @viz init
        if (digits.isEmpty()) return result; // no digits: no combinations (not [""]) // @viz empty
        path = new StringBuilder(); // @viz init
        backtrack(digits, 0); // @viz start
        return result; // @viz return
    }

    private void backtrack(String digits, int i) { // pick a letter for digits[i] // @viz call
        if (i == digits.length()) { // one letter picked for every digit // @viz done
            result.add(path.toString()); // @viz done
            return; // @viz done
        }
        for (char ch : LETTERS[digits.charAt(i) - '0'].toCharArray()) { // @viz choose
            path.append(ch); // @viz choose
            backtrack(digits, i + 1); // @viz choose
            path.deleteCharAt(path.length() - 1); // undo, so the next letter can take its place // @viz undo
        }
    }
}
