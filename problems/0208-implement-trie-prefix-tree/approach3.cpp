#include <string>
class Trie {
public:
    Trie() : root(new Node()) {} // @viz init
    void insert(std::string word) {
        Node* node = root; // @viz insert
        for (char ch : word) { // @viz insert
            int k = ch - 'a'; // 'a' -> 0 ... 'z' -> 25 // @viz insert
            if (!node->child[k]) node->child[k] = new Node(); // @viz insert
            node = node->child[k]; // @viz insert
        }
        node->end = true; // a word ends here // @viz end
    }
    bool search(std::string word) {
        Node* node = walk(word); // @viz search
        return node && node->end; // spelled out, and a word ends exactly here // @viz search
    }
    bool startsWith(std::string prefix) {
        return walk(prefix) != nullptr; // spelled out is enough // @viz prefix
    }
private:
    struct Node {
        Node* child[26] = {}; // child[k] = the node for letter 'a' + k
        bool end = false;
    };
    Node* root;
    Node* walk(const std::string& s) { // the node reached by spelling s, or null // @viz walk
        Node* node = root; // @viz walk
        for (char ch : s) { // @viz walk
            node = node->child[ch - 'a']; // @viz walk
            if (!node) return nullptr; // @viz walk
        }
        return node; // @viz walk
    }
};
