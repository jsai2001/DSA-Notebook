/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
#include <unordered_set>
class Solution {
public:
    bool hasCycle(ListNode* head) {
        std::unordered_set<ListNode*> seen; // the nodes themselves, not their values // @viz init
        for (ListNode* node = head; node; node = node->next) { // @viz walk
            if (!seen.insert(node).second) { // already there: back at a node we've passed // @viz found
                return true; // @viz found
            }
        }
        return false; // reached the end (null): no cycle // @viz none
    }
};
