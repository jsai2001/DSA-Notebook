import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
class Solution {
    private Set<List<Integer>> found;
    private List<Integer> path;
    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        Arrays.sort(candidates); // sorted, so equal combinations become equal lists // @viz sort
        found = new HashSet<>(); // a set throws away combinations it has already seen // @viz sort
        path = new ArrayList<>(); // @viz sort
        dfs(candidates, 0, target); // @viz start
        return new ArrayList<>(found); // @viz return
    }
    private void dfs(int[] candidates, int i, int remaining) { // decide about candidates[i] // @viz call
        if (remaining == 0) { // @viz done
            found.add(new ArrayList<>(path)); // @viz done
            return; // @viz done
        }
        if (i == candidates.length || remaining < 0) return; // no candidates left, or overshot // @viz dead
        path.add(candidates[i]); // take it (once), then move on // @viz take
        dfs(candidates, i + 1, remaining - candidates[i]); // @viz take
        path.remove(path.size() - 1); // @viz undo
        dfs(candidates, i + 1, remaining); // skip it // @viz skip
    }
}
