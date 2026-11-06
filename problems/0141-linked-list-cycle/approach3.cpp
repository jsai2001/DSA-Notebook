/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    bool hasCycle(ListNode* head) {
        ListNode* slow = head; // @viz init
        ListNode* fast = head; // @viz init
        while (fast && fast->next) { // fast needs two nodes ahead to take its step // @viz loop
            slow = slow->next; // one step // @viz move
            fast = fast->next->next; // two steps // @viz move
            if (slow == fast) return true; // in a cycle, fast gains one node per step and catches slow // @viz found
        }
        return false; // fast reached the end: no cycle // @viz none
    }
};
