import java.util.ArrayList;
import java.util.List;
class Solution {
    public List<String> generateParenthesis(int n) {
        List<List<String>> dp = new ArrayList<>(); // dp.get(k): every valid string with k pairs // @viz init
        dp.add(List.of("")); // 0 pairs -> just "" // @viz init
        for (int k = 1; k <= n; k++) { // @viz size
            List<String> cur = new ArrayList<>(); // @viz size
            for (int c = 0; c < k; c++) { // c pairs inside the first "( )", the other k - 1 - c after it // @viz split
                for (String inside : dp.get(c)) // @viz combine
                    for (String after : dp.get(k - 1 - c)) // @viz combine
                        cur.add("(" + inside + ")" + after); // @viz combine
            }
            dp.add(cur); // @viz size
        }
        return dp.get(n); // @viz return
    }
}
