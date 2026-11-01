import java.util.ArrayList;
import java.util.List;
class Solution {
    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> perms = new ArrayList<>(); // all permutations of the numbers seen so far // @viz init
        perms.add(new ArrayList<>()); // none yet: one empty one // @viz init
        for (int x : nums) { // @viz next
            List<List<Integer>> grown = new ArrayList<>(); // @viz next
            for (List<Integer> p : perms) { // @viz insert
                for (int pos = 0; pos <= p.size(); pos++) { // put x in every gap: before, between, after // @viz insert
                    List<Integer> q = new ArrayList<>(p); // @viz insert
                    q.add(pos, x); // @viz insert
                    grown.add(q); // @viz insert
                }
            }
            perms = grown; // k numbers -> k! permutations // @viz next
        }
        return perms; // @viz return
    }
}
