import java.util.ArrayList;
import java.util.List;
class Solution {
    public List<String> generateParenthesis(int n) {
        List<String> result = new ArrayList<>(); // @viz init
        for (int mask = 0; mask < (1 << (2 * n)); mask++) { // every string of 2n brackets: bit k set = '(' at position k // @viz loop
            StringBuilder s = new StringBuilder(); // @viz build
            for (int k = 0; k < 2 * n; k++) s.append((mask >> k & 1) == 1 ? '(' : ')'); // @viz build
            int balance = 0; // @viz check
            for (int k = 0; k < s.length(); k++) { // @viz check
                balance += s.charAt(k) == '(' ? 1 : -1; // @viz check
                if (balance < 0) break; // a ')' with no '(' before it to close // @viz check
            }
            if (balance == 0) result.add(s.toString()); // never went below 0 and ended at 0: valid // @viz keep
        }
        return result; // @viz return
    }
}
