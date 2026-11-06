import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
class Solution {
    private int[] sorted;
    private Set<List<Integer>> seen; // a set keeps one copy of each
    private List<Integer> path;
    public List<List<Integer>> subsetsWithDup(int[] nums) {
        sorted = nums.clone(); // @viz init
        Arrays.sort(sorted); // equal subsets now come out in the same order: [1,2] never [2,1] // @viz init
        seen = new HashSet<>(); // @viz init
        path = new ArrayList<>(); // @viz init
        backtrack(0); // @viz init
        return new ArrayList<>(seen); // @viz return
    }
    private void backtrack(int i) { // decide sorted[i], sorted[i+1], ... // @viz call
        if (i == sorted.length) { // @viz done
            seen.add(new ArrayList<>(path)); // a copy: path keeps changing // @viz done
            return; // @viz done
        }
        path.add(sorted[i]); // take sorted[i] // @viz take
        backtrack(i + 1); // @viz take
        path.remove(path.size() - 1); // leave it out // @viz skip
        backtrack(i + 1); // @viz skip
    }
}
