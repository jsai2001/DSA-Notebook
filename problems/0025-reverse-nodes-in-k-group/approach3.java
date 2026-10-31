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
class Solution {
    public ListNode reverseKGroup(ListNode head, int k) {
        ListNode dummy = new ListNode(0, head); // in front, so the first group isn't a special case // @viz init
        ListNode before = dummy; // the node just before the next group // @viz init
        while (true) {
            ListNode end = before; // @viz find
            for (int i = 0; i < k; i++) { // walk k nodes: is there a whole group left? // @viz find
                end = end.next; // @viz find
                if (end == null) return dummy.next; // fewer than k left: they stay as they are // @viz short
            }
            ListNode first = before.next; // the group is first..end // @viz group
            ListNode after = end.next; // the node past it // @viz group
            ListNode prev = after; // reverse the group; first will end up pointing to after // @viz group
            ListNode cur = first; // @viz group
            while (cur != after) { // @viz flip
                ListNode nxt = cur.next; // @viz flip
                cur.next = prev; // @viz flip
                prev = cur; // @viz flip
                cur = nxt; // @viz flip
            }
            before.next = end; // end is the group's new first node // @viz connect
            before = first; // first is now its last node, just before the next group // @viz connect
        }
    }
}
