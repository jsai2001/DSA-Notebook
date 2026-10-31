/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
class Solution {
    public ListNode reverseKGroup(ListNode head, int k) {
        List<ListNode> nodes = new ArrayList<>(); // @viz collect
        for (ListNode node = head; node != null; node = node.next) nodes.add(node); // @viz collect
        for (int start = 0; start + k <= nodes.size(); start += k) // every full group; a shorter tail is skipped // @viz group
            Collections.reverse(nodes.subList(start, start + k)); // reverse the group's order in the array // @viz reverse
        for (int i = 0; i + 1 < nodes.size(); i++) nodes.get(i).next = nodes.get(i + 1); // relink the same nodes in the new order // @viz link
        nodes.get(nodes.size() - 1).next = null; // @viz return
        return nodes.get(0); // @viz return
    }
}
