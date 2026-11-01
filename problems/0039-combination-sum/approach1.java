import java.util.ArrayList;
import java.util.List;
class Solution {
    private List<List<Integer>> result;
    private List<Integer> path;
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        result = new ArrayList<>(); // @viz start
        path = new ArrayList<>(); // @viz start
        dfs(candidates, 0, target); // @viz start
        return result; // @viz return
    }
    private void dfs(int[] candidates, int i, int remaining) { // decide about candidates[i] // @viz call
        if (remaining == 0) { // path adds up to target // @viz done
            result.add(new ArrayList<>(path)); // @viz done
            return; // @viz done
        }
        if (i == candidates.length || remaining < 0) return; // no candidates left, or overshot // @viz dead
        path.add(candidates[i]); // take candidates[i]; stay at i, so it can be taken again // @viz take
        dfs(candidates, i, remaining - candidates[i]); // @viz take
        path.remove(path.size() - 1); // undo the take // @viz undo
        dfs(candidates, i + 1, remaining); // skip it: candidates[i] is never used again on this branch // @viz skip
    }
}
