import java.util.ArrayList;
import java.util.List;
class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<List<Integer>>> dp = new ArrayList<>(); // dp.get(t): every combination that adds up to t // @viz init
        for (int t = 0; t <= target; t++) dp.add(new ArrayList<>()); // @viz init
        dp.get(0).add(new ArrayList<>()); // one way to make 0: take nothing // @viz init
        for (int c : candidates) { // candidates in the outer loop, so each combination is built in one order // @viz coin
            for (int t = c; t <= target; t++) { // @viz amount
                for (List<Integer> combo : dp.get(t - c)) { // every way to make t - c, plus one more c // @viz extend
                    List<Integer> longer = new ArrayList<>(combo); // @viz extend
                    longer.add(c); // @viz extend
                    dp.get(t).add(longer); // @viz extend
                }
            }
        }
        return dp.get(target); // @viz return
    }
}
