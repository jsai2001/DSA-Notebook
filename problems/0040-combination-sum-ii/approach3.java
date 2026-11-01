import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
class Solution {
    private int[] values, counts; // the k-th distinct value and how many times it appears, smallest first
    private List<List<Integer>> result;
    private List<Integer> path;
    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        TreeMap<Integer, Integer> tally = new TreeMap<>(); // value -> how many; a TreeMap keeps the values sorted // @viz count
        for (int c : candidates) tally.merge(c, 1, Integer::sum); // @viz count
        values = new int[tally.size()]; // @viz count
        counts = new int[tally.size()]; // @viz count
        int k = 0; // @viz count
        for (Map.Entry<Integer, Integer> e : tally.entrySet()) { // @viz count
            values[k] = e.getKey(); // @viz count
            counts[k++] = e.getValue(); // @viz count
        }
        result = new ArrayList<>(); // @viz count
        path = new ArrayList<>(); // @viz count
        backtrack(0, target); // @viz start
        return result; // @viz return
    }
    private void backtrack(int k, int remaining) { // decide how many copies of the k-th distinct value to use // @viz call
        if (remaining == 0) { // @viz done
            result.add(new ArrayList<>(path)); // @viz done
            return; // @viz done
        }
        if (k == values.length || values[k] > remaining) return; // no values left, or this and every later one too big // @viz dead
        int value = values[k]; // @viz none
        int most = Math.min(counts[k], remaining / value); // can't use more copies than exist, or than fit // @viz none
        backtrack(k + 1, remaining); // use no copies of value // @viz none
        for (int used = 1; used <= most; used++) { // then 1 copy, 2 copies, ... most copies // @viz copies
            path.add(value); // @viz copies
            backtrack(k + 1, remaining - used * value); // @viz copies
        }
        for (int used = 0; used < most; used++) path.remove(path.size() - 1); // take those copies off again // @viz undo
    }
}
